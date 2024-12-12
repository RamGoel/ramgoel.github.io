export const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
}

export const childVariants = {
    hidden: {
        opacity: 0,
        filter: 'blur(10px)',
    },
    visible: {
        opacity: 1,
        filter: 'blur(0px)',
        transition: {
            duration: 0.5,
        },
    },
}
