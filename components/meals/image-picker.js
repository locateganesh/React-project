'use client';
import Image from 'next/image';
import classes from './image-picker.module.css';
import { useState } from 'react';

export default function ImagePicker({name, label}) {
    const [pickedImage, setPickedImage] = useState();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) {
            setPickedImage(null);
            return;
        }
        const fileReader = new FileReader();
        // console.log(fileReader);
        fileReader.onload = () => {
            setPickedImage(fileReader.result)
        }
        fileReader.readAsDataURL(file);
    }
    return (
        <div className={classes.picker}>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {pickedImage ? (
                        <Image
                            src={pickedImage}
                            alt="selecteg imagr"
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                    ) : (
                        <p>No image picked yet.</p>
                    )}
                </div>
                
            </div>
            <input 
                className={classes.input}
                type="file" 
                id={name} 
                name={name}
                accept='image/png, image/jpeg, image/jpg, image/gif, image/webp, image/avif'
                onChange={handleFileChange}
                required
            />
            <label htmlFor={name}>{label}</label>
        </div>
    )
}