import { Button } from '@/components/ui/button'
import React from 'react'
import { useUserContext } from "../../context/AuthContext";
import { json } from 'stream/consumers';


const fetchData = async (userId: any) => {
  try {
    const response = await fetch('https://cloud.appwrite.io/v1/storage/buckets/6734f75c0029042ea147/files/exemple/view?project=66dc9b3c003c275c9bda&project=66dc9b3c003c275c9bda&mode=admin');
    const data = await response.text();

    // Conversion du CSV en tableau
    const rows = data.split('\n').map(row => row.split(','));
    
    // Extraction des en-têtes et des lignes de données
    const headers = rows[0]; // Première ligne (en-têtes)
    const jsonData = rows.slice(1).map(row => {
      return headers.reduce((acc, header, index) => {
        acc[header.trim()] = row[index]?.trim(); // Création d'un objet clé-valeur
        return acc;
      }, {});
    });

    // Filtrage par userId
    const filteredData = jsonData.filter(item => item['ID'] === userId);
    
    console.log('Données filtrées correspondant à userId:', filteredData);

    console.log('Fichier CSV téléchargé et traité avec succès.');
  } catch (error) {
    console.error('Erreur lors du téléchargement ou du traitement du fichier CSV :', error);
  } ; 

};


function Grades() {
    const { user } = useUserContext();

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
                    onClick={()=>fetchData(user.id)}
                    >
                    Update
                </Button>

            </div>
        </div>
    )
}







export default Grades