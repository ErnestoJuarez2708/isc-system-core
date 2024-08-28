import { Dayjs } from "dayjs";

interface EventInterns {
  id_event: number;
  id_intern: number;
  status: string;
  is_reserve: boolean;
  created_at: Dayjs;
  updated_at: Dayjs;
}

export default EventInterns