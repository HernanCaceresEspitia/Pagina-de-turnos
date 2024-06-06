interface IAppointment {
    id: number;
    date: string;
    time: string;
    userId: number;
    status: boolean;
    description: string;
}

export default IAppointment;