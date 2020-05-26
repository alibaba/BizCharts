import 'react';
import Calendar, { CalendarConfig } from '@antv/g2plot/lib/plots/calendar';
import createPlot from '../createPlot';

export default createPlot<CalendarConfig>(Calendar, 'CalendarChart');
