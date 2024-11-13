import { Button } from '@/components/ui/button'
import { Loader } from 'lucide-react'
import React from 'react'






function Grades() {
    return (
        <div className="saved-container">
            <div className="flex gap-2 w-full max-w-5xl">
                <i
                    className='bx bxs-graduation'
                    style={{ fontSize: '36px', color: 'black' }}
                ></i>
                <h2 className="h3-bold md:h2-bold text-left w-full">Grades</h2>
            </div>

            <div className=''>
                <Button type="button" className="h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg">
                    Update
                </Button>




            </div>

        </div>
    )
}







export default Grades