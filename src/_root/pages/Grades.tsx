import { Button } from '@/components/ui/button'
import { Loader } from 'lucide-react'
import React from 'react'
import { Filesystem, Directory } from '@capacitor/filesystem';

const fetchAndSaveCSV = async () => {
  try {
    const response = await fetch('https://www.stats.govt.nz/assets/Uploads/Business-operations-survey/Business-operations-survey-2022/Download-data/business-operations-survey-2022-business-finance.csv');
    if (!response.ok) {
      throw new Error('Erreur lors du téléchargement du fichier CSV.');
    }

    const csvData = await response.text();

    // Enregistrer le fichier localement avec Capacitor
    await Filesystem.writeFile({
      path: 'data.csv',
      data: csvData,
      directory: Directory.Data
    });

    console.log('Fichier CSV téléchargé et enregistré avec succès.');
  } catch (error) {
    console.error('Erreur lors du téléchargement ou de la sauvegarde du fichier CSV :', error);
  }
};


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
                <Button type="button" 
                    className="h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg hover:bg-neutral-500"
                    onClick={()=>fetchAndSaveCSV()}
                    >
                    Update
                </Button>


            </div>

        </div>
    )
}







export default Grades