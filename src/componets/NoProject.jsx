import Button from './Button.jsx';
import noProjectImg from '../assets/no-projects.png';
export default function NoProject({onStartAddProject}) {
    return (
        <div className="mt-24 text-center w-2/3">
            <img src={noProjectImg} alt="No Porject found" className='w-16 h-16 object-contain mx-auto' />
            <h2 className='text-xl font-bold text-stone-500 my-4'>No Porject Selected</h2>
            <p className='text-stone-400 mb-4'>Please select a new project or create a new one</p>
            <p className='mt-8'><Button onClick={onStartAddProject}>Create a new Project</Button></p>
        </div>
    )
}