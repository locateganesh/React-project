// 'use server';

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

const isInvalid = (text) => !text || text.trim() === '';

export async function shareMeal(prevState, formData) {
    const meal = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        intructions: formData.get('instructions'),
        image: formData.get('image'),
        creator: formData.get('creator'),
        creator_email: formData.get('email')
    };
    // console.log(meal);

    if (
        isInvalid(meal.title) ||
        isInvalid(meal.summary) || 
        isInvalid(meal.intructions) || 
        isInvalid(meal.creator) || 
        isInvalid(meal.creator_email) || 
        !meal.creator_email.includes('@') ||
        !meal.image || image.size === 0
    ) {
        return {
            message: 'Invalid Input'
        }
    }

    await saveMeal(meal);
    revalidatePath('/meals'); // clear the next js cache. help when new data is added it shows data on listing after revalidatePath.
    // revalidatePath('/', '/layout'); // You can revalidate the all pages.
    // revalidatePath('/layout'); // You can revalidate only layout pages.
    redirect('/meals');
}