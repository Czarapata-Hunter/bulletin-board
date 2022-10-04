export function renderBulletin(bulletin) {
    const li = document.createElement('li');

    const h2 = document.createElement('h2');
    h2.textContent = bulletin.title;

    const bd = document.createElement('p');
    bd.textContent = bulletin.description;

    const bcat = document.createElement('h4');
    bcat.textContent = bulletin.category;

    const bcon = document.createElement('h5');
    bcon.textContent = bulletin.contact;

    const img = document.createElement('img');
    img.src = bulletin.image_url;

    li.append(img, h2, bd, bcat, bcon);

    return li;
}
