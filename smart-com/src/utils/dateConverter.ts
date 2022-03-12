export const dateConverter = (fullDate: string) => {
  if (fullDate) {
    const datePartsList = fullDate.split('T');
    const date = datePartsList[0].split('-').join('.');
    const time = datePartsList[1].split(':').splice(0,2).join(':');
    const convertedFullDate = date + ' в ' + time;
    return convertedFullDate;
  } else {
    return 'Дата неизвестна';
  }
};