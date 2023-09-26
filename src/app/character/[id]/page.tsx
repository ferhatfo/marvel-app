import { detailCharacter } from "@/utils/api";
import React, { FC } from "react";
import Image from 'next/image'
interface CharacterPageProps {
    params: {
        id: string
    }
};

const CharacterPage:FC<CharacterPageProps> = async ({params}) => {
    const {id} = params
    const character = await detailCharacter(id)
    const { thumbnail, name, description} = character.results[0];
    return (
        <div className="container flex flex-col gap-5 items-center cardDetail">
            <Image
                src={`${thumbnail.path}.${thumbnail.extension}`}
                alt={name}
                width={500}
                height={400}
            />
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="tex-3xl font-bold mb-4">{name}</h2>
                <p className="text-sm font-light">{description}</p>
            </div>
        </div>
    )
};

export default CharacterPage;