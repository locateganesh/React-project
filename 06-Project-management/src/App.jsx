import { useState } from 'react';
import ProjectSidebar from './componets/ProjectSidebar';
import NewProject from './componets/NewProject';
import NoProject from './componets/NoProject';
import SelectedProject from './componets/SelectedProject';


function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    project: [],
    tasks: []
  });

  const handleAddTask = (text) => {
    const taskId = Math.floor(Math.random() * 10000);
    
    setProjectState(prevProject => {
      const newTask = {
        text,
        projectId: prevProject.selectedProjectId,
        id: taskId
      };
      return {
        ...prevProject,
        tasks: [newTask, ...prevProject.tasks]
      }
    });
  }

  const handleDeleteTask = (id) => {
    setProjectState(prevProject => {
      return {
        ...prevProject,
        tasks: prevProject.tasks.filter((task) => task.id !== id)
      }
    });
  }

  const handleProjectSelect = (id) => {
    setProjectState(prevProject => {
      return {
        ...prevProject,
        selectedProjectId: id
      }
    });
  }

  const handleStartAddProject = () => {
    setProjectState(prevProject => {
      return {
        ...prevProject,
        selectedProjectId: null
      }
    });
  };

  const handleAddProject = (projectData) => {
    const projectId = Math.floor(Math.random() * 10000);
    const newProject = {
      ...projectData,
      id: projectId
    };
    setProjectState(prevProject => {
      return {
        ...prevProject,
        selectedProjectId: undefined,
        project: [...prevProject.project, newProject]
      }
    });
  };

  const handleCancelAddProject = () => {
    setProjectState(prevProject => {
      return {
        ...prevProject,
        selectedProjectId: undefined,
      }
    });
  }

  function handleDelete() {
    setProjectState(prevProject => {
      return {
        ...prevProject,
        selectedProjectId: undefined,
        project: prevProject.project.filter((project) => project.id !== prevProject.selectedProjectId)
      }
    });
  }

  const selectedProject = projectState.project.find(project => project.id === projectState.selectedProjectId);
  let content = <SelectedProject project={selectedProject} onDelete={handleDelete} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} tasks={projectState.tasks} /> ; 
  if (projectState.selectedProjectId === null) {
    content = <NewProject onAddProject={handleAddProject} onCancel={handleCancelAddProject}  />
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProject onStartAddProject={handleStartAddProject} />
  }

  

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar onStartAddProject={handleStartAddProject} projects={projectState.project} onSelectProject={handleProjectSelect} selectedProjectId={projectState.selectedProjectId} />
      {content}
    </main>
  );
}

export default App;
