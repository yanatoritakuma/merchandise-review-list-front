import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import dayjs, { Dayjs } from "dayjs";
import Badge from "@mui/material/Badge";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
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
      badgeContent={isSelected ? "!!!" : undefined}
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

  const getCurrentYearMonth = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    const yearMonth = year * 100 + month;

    return yearMonth;
  };

  const { data } = useQueryUserProductTimeLimitYearMonth(getCurrentYearMonth());
  const requestAbortController = useRef<AbortController | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedDays, setHighlightedDays] = useState<number[]>([]);

  const fetchHighlightedDays = () => {
    const controller = new AbortController();

    const fixedHighlightedDays = [1, 2, 3];

    setHighlightedDays(fixedHighlightedDays);
    setIsLoading(false);

    requestAbortController.current = controller;
  };

  useEffect(() => {
    fetchHighlightedDays();
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = () => {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays();
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box css={modalCalendarBox}>
        <ButtonBox
          onClick={() => router.push("/mypage/calendar-registered-all")}
        >
          購入期日を設定した商品全てを見る
        </ButtonBox>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            defaultValue={initialValue}
            loading={isLoading}
            onMonthChange={handleMonthChange}
            renderLoading={() => <DayCalendarSkeleton />}
            slots={{
              day: ServerDay,
            }}
            slotProps={{
              day: {
                highlightedDays,
              } as any,
            }}
          />
        </LocalizationProvider>
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
`;
