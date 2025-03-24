
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DateSelectArg} from '@fullcalendar/core';
import { Btn } from '../ui/Button';

type CalendarProps = {
  Click: ((arg: DateSelectArg) => void);
  Close: () => void;
}

const Calendar = ({Click, Close}:CalendarProps) => {


  return (
    <div className="p-4 flex flex-col justify-between w-full h-[460px]  md:w-[505px] sm:h-[520px] bg-white rounded-lg shadow-md ">
      <div className='h-[90%] p-2'>
        <FullCalendar plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} 
          initialView="dayGridMonth" 
          selectable={true}
          select={Click}
        />
      </div>
      <Btn onClick={Close}
        fontStyle='work' weight='medium'
        className="w-full flex items-center text-center h-12 bg-primary-600 text-white text-sm">
        Done
      </Btn>
    </div>
  );
};

export default Calendar;
