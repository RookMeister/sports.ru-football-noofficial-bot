export const mainMenu = {
  'size': 2,
  'column': false,
  'values': [
    { 'label': 'Матчи', 'value': 'update-matches:yesterday', 'active': 1 },
    { 'label': 'Статистика', 'value': 'select-tournament', 'active': 1 },
    { 'label': 'Обзоры за день', 'active': 0 },
    { 'label': 'О боте', 'active': 0 },
    { 'label': 'Donate', 'value': 'https://www.tinkoff.ru/cf/4320g6jTu2L', 'active': 1, url: true }
  ]
}
export const matchesUpdate = {
  'size': 3,
  'column': false,
  'values': [
    { 'label': 'Вчера', 'value': 'update-matches:yesterday', 'active': 1 },
    { 'label': 'Сегодня', 'value': 'update-matches:today', 'active': 1 },
    { 'label': 'Завтра', 'value': 'update-matches:tomorrow', 'active': 1 },
    { 'label': '⏪Назад', 'value': 'update-matches:back', 'active': 1 },
    { 'label': 'Donate', 'value': 'https://www.tinkoff.ru/cf/4320g6jTu2L', 'active': 1, url: true }
  ]
}
export const reviewsUpdate = {
  'size': 1,
  'column': false,
  'values': [{ 'label': 'Обновить', 'value': 'update-reviews', 'active': 1 }]
}
export const donate = {
  'size': 1,
  'column': false,
  'values': [{ 'label': 'Donate', 'value': 'https://www.tinkoff.ru/cf/4320g6jTu2L', 'active': 1, url: true }]
}
export const statTournamentMenu = {
  'size': 3,
  'column': false,
  'values': [
    { 'active': 1, 'value': 'select-tournament:$.table', 'label':	'Таблица' },
    { 'active': 1, 'value': 'select-tournament:$.last', 'label':	' Результаты' },
    { 'active': 1, 'value': 'select-tournament:$.future', 'label':	'Календарь' },
    { 'active': 1, 'value': 'select-tournament:$.back', 'label':	'⏪Назад' },
    { 'active': 0, 'value': 'select-tournament:$.player', 'label':	'Статистика игроков' },
    { 'label': 'Donate', 'value': 'https://www.tinkoff.ru/cf/4320g6jTu2L', 'active': 1, url: true }
  ]
}
export const statBotMenu = {
  'size': 3,
  'column': false,
  'values': [
    { 'active': 1, 'label':'Вчера', 'value': 'select-stat-bot:prev' },
    { 'active': 1, 'label':'Сегодня', 'value': 'select-stat-bot:now' }
  ]
}
export const setTime = {
  'size': 6,
  'column': false,
  'values': [
    { 'active': 1, 'label':'-12', 'value':'select-time:-12' },
    { 'active': 1, 'label':'-11', 'value':'select-time:-11'},
    { 'active': 1, 'label':'-10', 'value':'select-time:-10'},
    { 'active': 1, 'label':'-9', 'value':'select-time:-9'},
    { 'active': 1, 'label':'-8', 'value':'select-time:-8'},
    { 'active': 1, 'label':'-7', 'value':'select-time:-7'},
    { 'active': 1, 'label':'-6', 'value':'select-time:-6'},
    { 'active': 1, 'label':'-5', 'value':'select-time:-5'},
    { 'active': 1, 'label':'-4', 'value':'select-time:-4'},
    { 'active': 1, 'label':'-3', 'value':'select-time:-3'},
    { 'active': 1, 'label':'-2', 'value':'select-time:-2'},
    { 'active': 1, 'label':'-1', 'value':'select-time:-1'},
    { 'active': 1, 'label':'0', 'value':'select-time:0'},
    { 'active': 1, 'label':'+1', 'value':'select-time:+1'},
    { 'active': 1, 'label':'+2', 'value':'select-time:+2'},
    { 'active': 1, 'label':'+3', 'value':'select-time:+3'},
    { 'active': 1, 'label':'+4', 'value':'select-time:+4'},
    { 'active': 1, 'label':'+5', 'value':'select-time:+5'},
    { 'active': 1, 'label':'+6', 'value':'select-time:+6'},
    { 'active': 1, 'label':'+7', 'value':'select-time:+7'},
    { 'active': 1, 'label':'+8', 'value':'select-time:+8'},
    { 'active': 1, 'label':'+9', 'value':'select-time:+9'},
    { 'active': 1, 'label':'+10', 'value':'select-time:+10'},
    { 'active': 1, 'label':'+11', 'value':'select-time:+11'}
  ]
}