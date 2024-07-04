const slugify = (string: string) => {
    return string
        .toLocaleLowerCase()
        .replace(' ', '-');
}

export default slugify;