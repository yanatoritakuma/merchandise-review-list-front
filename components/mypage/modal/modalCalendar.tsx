import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import dayjs, { Dayjs } from "dayjs";
import Badge from "@mui/material/Badge";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { ButtonBox } from "@/components/elements/buttonBox";
import { useQueryUserProductTimeLimitYearMonth } from "@/hooks/product/useQueryUserProductTimeLimitYearMonth";

type Props = {
  open: boolean;
  setOpen: (value: React.SetStateAction<boolean>) => void;
};

const initialValue = dayjs();

const ServerDay = (
  props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }
) => {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth &&
    highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={
        isSelected ? (
          <span css={badgeIcon}>
            <PriorityHighIcon />
          </span>
        ) : undefined
      }
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
};

export const ModalCalendar = ({ open, setOpen }: Props) => {
  const router = useRouter();
  const [currentYearMonth, setCurrentYearMonth] = useState<number | null>();

  const getCurrentYearMonth = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    const yearMonth = year * 100 + month;

    return yearMonth;
  };

  const {
    data,
    isLoading: timeLimitYearMonthIsLoading,
    refetch,
  } = useQueryUserProductTimeLimitYearMonth(
    currentYearMonth !== null && currentYearMonth !== undefined
      ? currentYearMonth
      : getCurrentYearMonth()
  );
  console.log("data", data);

  const requestAbortController = useRef<AbortController | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedDays, setHighlightedDays] = useState<number[]>([]);

  const timeLimits = data?.productNumbers.map((num) => {
    return num.timeLimit.substring(8, 10);
  });

  const timeLimitArray = timeLimits?.map((str) => parseInt(str, 10));

  const fixedHighlightedDays: number[] =
    timeLimitArray !== undefined ? timeLimitArray : [];

  const fetchHighlightedDays = () => {
    const controller = new AbortController();

    setHighlightedDays(fixedHighlightedDays);
    setIsLoading(false);

    requestAbortController.current = controller;
  };

  useEffect(() => {
    fetchHighlightedDays();
    return () => requestAbortController.current?.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    refetch();
    fetchHighlightedDays();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentYearMonth]);

  useEffect(() => {
    fetchHighlightedDays();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // 年月日のフォーマット形成
  const convertYearMonthToNumber = (d: string) => {
    const regex = /(\b\w{3}\b) (\b\w{3}\b) (\d{2}) (\d{4})/;
    const match = String(d).match(regex);

    const month = match && match[2]; // 月

    const year = match && match[4]; // 年

    let yearMonth = "";

    switch (month) {
      case "Jan":
        yearMonth = year + "01";
        break;
      case "Feb":
        yearMonth = year + "02";
        break;
      case "Mar":
        yearMonth = year + "03";
        break;
      case "Apr":
        yearMonth = year + "04";
        break;
      case "May":
        yearMonth = year + "05";
        break;
      case "Jun":
        yearMonth = year + "06";
        break;
      case "Jul":
        yearMonth = year + "07";
        break;
      case "Aug":
        yearMonth = year + "08";
        break;
      case "Sep":
        yearMonth = year + "09";
        break;
      case "Oct":
        yearMonth = year + "10";
        break;
      case "Nov":
        yearMonth = year + "11";
        break;
      case "Dec":
        yearMonth = year + "12";
        break;

      default:
        break;
    }

    return yearMonth;
  };

  // 先月、来月のonChange
  const handleMonthChange = (d: any) => {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays();
    setCurrentYearMonth(Number(convertYearMonthToNumber(d.$d)));
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box css={modalCalendarBox}>
        {!timeLimitYearMonthIsLoading ? (
          <>
            <ButtonBox
              onClick={() => router.push("/mypage/calendar-registered-all")}
            >
              購入期日を設定した商品全てを見る
            </ButtonBox>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                defaultValue={initialValue}
                loading={isLoading}
                onMonthChange={(d) => handleMonthChange(d)}
                renderLoading={() => <DayCalendarSkeleton />}
                slots={{
                  day: ServerDay,
                }}
                slotProps={{
                  day: {
                    highlightedDays,
                  } as any,
                }}
                onChange={(e) => console.log(e)}
              />
            </LocalizationProvider>
          </>
        ) : (
          "Loading"
        )}
      </Box>
    </Modal>
  );
};

ModalCalendar.displayName = "ModalCalendar";

const modalCalendarBox = css`
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: fit-content;
  background-color: #fff;
  border: 1px solid #333;
  border-radius: 10px;

  button {
    margin: 0 auto;
    margin-bottom: 20px;
    display: block;
  }

  div {
    max-height: unset;
    height: unset;
  }
`;

const badgeIcon = css`
  padding: 2px;
  background-color: #e9546b;
  border-radius: 50%;

  svg {
    width: 12px;
    height: 12px;
  }
`;
