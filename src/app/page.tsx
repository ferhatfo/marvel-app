"use client";
import Image from 'next/image'
import CharacterCard from '../Components/CharacterCard'
import { getCharacters } from '@/utils/api'
import { Pagination } from 'nextjs-pagination';
import { useEffect, useState } from 'react';
import { CharacterDataWrapper } from '@/types/marvels';
export default function Home() {

  const [currentPage, setCurrentPage] = useState(1);
  const [characters, setCharacters] = useState<CharacterDataWrapper | null>(null);

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCharacters(currentPage, 10);
        setCharacters(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [currentPage]);

  return (
    <main>
      <div className='container'>
        <div className='title'>
          <h1>Popular Characters</h1>
        </div>
        <div className='grid gap-4 sm:grid-cols-2 sm:grid-cols-3'>
          {characters && characters.results.map(character => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
        <Pagination
          totalItems={50}
          itemsPerPage={10}
          onPageChange={handlePageChange}
          color="green"
          shape="circle"
          buttonCount={7}
          showNextPrev={true}
          showFirstLast={true}
          onSuccess={(page: number) => console.log("Current page: ", page)}
          onError={(error: Error) => console.error(error)}
          firstText="First"
          lastText="Last"
          prevText="Prev"
          nextText="Next"
          className="custom-pagination-container-class"
          buttonClassName="custom-pagination-button-class"
        />
      </div>
    </main>
  )
}
