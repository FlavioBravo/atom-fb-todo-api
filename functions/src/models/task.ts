export default interface ITask {
  id?: string;
  title: string;
  description: string;
  status: string;
  created_date: Date;
  modified_date?: Date;
}
