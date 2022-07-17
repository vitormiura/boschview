export interface Project {
  project_name: string;
  students: string; // list separated by comma?
  area: string;
  course: string;
  created_date: string;
  description: string;
  techs: string; // list separated by comma?
  contact: string;
  finish_ratio: number;
  // status: "Em andamento" | "Concluído" | "Implementado";
  status: string;
  project_id: string;
  image_path: string;
}

export interface Notificate {
  notificate: (
    notificationMessage: string,
    severity?: "error" | "warning" | "info" | "success"
  ) => void;
}
