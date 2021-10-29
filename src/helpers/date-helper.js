import { add } from 'date-fns';

export const addDateTime = (params) => add(new Date(), params);
