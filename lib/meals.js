import fs from 'node:fs'
import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
const db = sql('meals.db');

export async function getMeals() {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Just for dummy loadind.
    // throw new Error('Failed to load data');
    return db.prepare('SELECT * FROM meals').all();
    // all() is for fetching data.
    // run() is updating and adding data.
}

export function getMeal(slug) {
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal) {
    meal.slug = slugify(meal.title, {lower: true});
    meal.instructions = xss(meal.instructions);

    const extension = meal.image.name.split('.').pop();
    const randomNum = Math.floor(Math.random() * 10000);
    const fileName = `${meal.slug}-${randomNum}.${extension}`;

    const stream = fs.createWriteStream(`public/images/${fileName}`); // this root public/images folder
    const bufferedImage = await meal.image.arrayBuffer();
    stream.write(Buffer.from(bufferedImage), (error) => {
        if (error) {
            throw new Error('Saving image failed!');
        }
    });
    meal.image = `/images/${fileName}`;

    db.prepare(`
        INSERT INTO meals
            (title, summary, instructions, creator, creator_email, image, slug)
        VALUES (
            @title, 
            @summary, 
            @instructions, 
            @creator, 
            @creator_email, 
            @image, 
            @slug
        )    
    `).run(meal)
}