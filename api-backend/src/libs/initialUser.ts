import User from '../models/User';

export const createUser = async () => {
    try {
        const county = await User.estimatedDocumentCount();
        if(county > 0) return;

        const val = await Promise.all([
            new User ({
                username: "admin",
                password: "Zernike"
            }).save()
        ]);
    } catch(error) {
        console.error(error);
    }
}