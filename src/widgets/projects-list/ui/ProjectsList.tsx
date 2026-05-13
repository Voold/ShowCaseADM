import {useState} from "react";
import { ProjectSlot } from "@/entities/project";
import {DynamicList} from "@/shared";

const mockProjects = Array.from({length: 24}, (_, i) => ({
  id: i.toString(),
  name: `Проект ${i + 1}. Н. Проект ${i + 1}. Н. Проект ${i + 1}. Н. Проект ${i + 1}. Н.`,
  school: `ИШИТР`,
  status: 'pending'
}));

const ProjectsList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredProjects = mockProjects.filter((project) => {
    const lowerQuery = searchQuery.toLowerCase();
    return (
        project.name.toLowerCase().includes(lowerQuery)
    );
  });

  const paginatedProjects = filteredProjects.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage) || 1;

  return (
      <DynamicList
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder={"Найти проект..."}
      >
        {
          paginatedProjects.map((project) => (
              <ProjectSlot
                  key={project.id}
                  id={project.id}
                  name={project.name}
                  school={project.school}
                  status={'pending'}
              />
          ))
        }
      </DynamicList>
  );
}

export default ProjectsList;