export const handleCalendar = () => {
  const event = {
    title: 'Mis XV - Rena',
    details: '¡Te espero para celebrar mis 15 años!',
    location: 'Los Zorzales, Ruta 8',
    start: '20260905T210000',
    end: '20260906T050000',
  };
  const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&details=${encodeURIComponent(event.details)}&location=${encodeURIComponent(event.location)}&dates=${event.start}/${event.end}`;
  window.open(url, '_blank');
};
