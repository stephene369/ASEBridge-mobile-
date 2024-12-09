import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { useUserContext } from "../../context/AuthContext";
import { json } from 'stream/consumers';
import { object } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import toast from 'react-hot-toast';

function Grades() {
  const { user } = useUserContext();
  const [isData, setIsData] = useState(false)
  const [Data, setData] = useState([])


  const [selectedSemester, setSelectedSemester] = useState('');
  const [program, setProgram] = useState('');
  const [country, setCountry] = useState('')

  const handleSemesterChange = (event) => {
    setSelectedSemester(event.target.value);
    console.log(selectedSemester)
  };

  const handleProgrmChange = (event) => {
    setProgram(event.target.value);
    console.log(program)
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
    console.log(country)
  };



  const fetchData = async (userId: any) => {
    try {
      const id_ = country + '-' + program + '-' + selectedSemester
      const response = await fetch(`https://cloud.appwrite.io/v1/storage/buckets/6734f75c0029042ea147/files/${id_}/view?project=66dc9b3c003c275c9bda&project=66dc9b3c003c275c9bda&mode=admin`);
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
      setData(filteredData); setIsData(true)
      Array.isArray(filteredData) && filteredData.length > 0 ? '' : toast.error(`Nothing found. Please try later.`)
      console.log((id_))
      console.log('Données filtrées correspondant à userId:', filteredData);
    } catch (error) {
      console.error('Erreur lors du téléchargement ou du traitement du fichier CSV :', error);
    };

  };



  return (
    <div className="py-10 px-5">
      <div className="flex gap-2 w-full max-w-5xl ">
        <i
          className='bx bxs-graduation'
          style={{ fontSize: '36px', color: 'black' }}
        ></i>
        <h2 className="h3-bold md:h2-bold text-left w-full">Grades</h2>
      </div>

      <div className='w-full flex gap-2 py-5'>

        <select
          onChange={handleSemesterChange}
          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200">
          <option value="" disabled selected>Select the semester</option>
          <option value="semester1">Semester 1</option>
          <option value="semester2">Semester 2</option>
          <option value="semester3">Semester 3</option>
          <option value="semester4">Semester 4</option>
          <option value="semester5">Semester 5</option>
          <option value="semester6">Semester 6</option>

        </select>


        <select
          onChange={handleProgrmChange}
          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200">
          <option value="" disabled selected>Select the program</option>
          <option value="stat-info">Bachelor Statistic & Computer Science</option>
          <option value="stat-eco">Bachelor Statistic & Economics</option>
          <option value="mark-mana">Bachelor Marketing Management</option>
          <option value="fin-comp">Bachelor Finance Comptability</option>
          <option value="mmes">Master - MES</option>
          <option value="mba">Master - BA</option>
        </select>


      </div>


      <select
        onChange={handleCountryChange}
        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200">
        <option value="" disabled selected>Select the country</option>
        <option value="benin" >ASE-Benin</option>
        <option value="ivorycoast" disabled>ASE-ivory coast</option>
        <option value="nigeria" disabled>ASE-Nigeria</option>
        <option value="tanzania" disabled>ASE-Tanzania</option>

      </select>


      <div className=''>
        <Button type="button"
          className="h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg my-5 hover:bg-neutral-500"
          onClick={() => fetchData(user.id)}
        >
          Update
        </Button>
      </div>






      <>
        {isData && Array.isArray(Data) && Data.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
            <thead className="bg-gray-100 border-b">
              <tr>

                {Object.keys(Data[0]).filter(key => key !== 'ID').map((key, index) => (
                  <th key={index} className="px-4 py-2 text-left font-semibold text-gray-700">
                    {key}
                  </th>
                ))}

              </tr>
            </thead>
            <tbody>
              {Data.map((item, rowIndex) => {
                // Recherche de la clé 'Grade' ou 'Note' dans l'objet
                const gradeOrNoteValue = Object.keys(item).find(key =>
                  ['Grade', 'Note'].includes(key)
                ) ? Number(item['Grade'] || item['Note']) : null;

                // Vérifie si la valeur est définie et applique la couleur correspondante
                const rowClass = (() => {
                  let className = 'bg-white'; // Couleur par défaut

                  // Vérifie si la valeur de `Grade` ou `Note` existe et est définie
                  if (gradeOrNoteValue !== null) {
                    // Vérifie si la valeur est >= 12
                    if (gradeOrNoteValue >= 12) {
                      className = 'note-vert'; // Vert clair si >= 12
                    } else {
                      console.log('Rouge')
                      className = 'note-rouge'; // Rouge si < 12
                    }
                  }

                  // Retourne la classe déterminée
                  return className;
                })();

                return (
                  <tr
                    key={rowIndex}
                    className={`border-b ${rowClass} hover:bg-gray-50 mb-2`} // Ajout de `mb-2` pour espacer les lignes
                  >
                    {/* Affiche toutes les valeurs sauf celle de la clé 'ID' */}
                    {Object.keys(item).filter(key => key !== 'ID').map((key, colIndex) => (
                      <td key={colIndex} className="px-4 py-2 text-gray-700">
                        {item[key]}
                      </td>
                    ))}
                  </tr>

                );
              })}
            </tbody>
          </table>
        ) : (

          <div>
            <div>Empty</div>
          </div>

        )}

      </>






    </div>
  )
}







export default Grades