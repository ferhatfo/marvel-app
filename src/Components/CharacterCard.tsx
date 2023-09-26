import { Character } from "@/types/marvels";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

interface CharacterCardProps {
    character: Character
};

const componentName:FC<CharacterCardProps> = ({character}) => {
    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl cardItem">
            <figure>
                <Image
                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                    alt={character.name}
                    width={500}
                    height={400}
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{character.name}</h2>
                <div className="card-actions">
                <Link href={`character/${character.id}`} className="btn btn-primary">Detail {character.name}</Link>
                </div>
            </div>
        </div>
    )
};

export default componentName;