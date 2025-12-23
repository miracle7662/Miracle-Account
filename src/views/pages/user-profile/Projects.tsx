import TitleHelmet from '@/components/Common/TitleHelmet'
import ProfileCover from '@/components/Pages/UserProfile/ProfileCover'
import { ProjectsComponent } from '@/components/Pages/UserProfile/Projects'

const Projects = () => {
  return (
    <>
      <TitleHelmet title="Projects" />
      <ProfileCover />
      <ProjectsComponent />
    </>
  )
}

export default Projects
