import { Project } from "../classes/Project";


interface Props{
  project: Project
  headerContent?: React.ReactNode; //this contains the header of the card e.g. project name, or task name, or any other title
  mainContent: React.ReactNode; //this contains the main content of the card e.g. a list of tasks, or a chart, or any other component
  style?: React.CSSProperties; //optional style for the card
}
export function DashboardCard(props: Props){
    return (
        <div className="dashboard-card" style = {props.style}>
                            <div className="dashboard-card-header">
                                {props.headerContent}
                            </div>
                            {props.mainContent}
        </div>
            
        
    );
}