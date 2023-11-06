import { useState } from 'react';
import { useParams } from 'react-router-dom';

import functions from '../../utils/functions';

export default function EditEntry (){

    const {entry_id} = useParams();

    return (
        <>
        <p>edit component</p>
        </>
    )
}