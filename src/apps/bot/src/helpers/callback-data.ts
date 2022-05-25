import { CallbackData } from 'telegraf-callback-data';

export const selectData = (identifier: string) => new CallbackData<{ code: string; }>(identifier, ['code']);