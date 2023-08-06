type Props = {
  params: {
    ticketId: string;
  };
};

const TicketInformationPage = ({ params: { ticketId } }: Props) => {
  return <div>{ticketId}</div>;
};

export default TicketInformationPage;
