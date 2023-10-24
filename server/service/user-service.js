const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-errors')

class UserService {
    async registration(email, password) {
        const candidate = await userModel.findOne({ email });
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
        };
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();

        const user = await userModel.create({ email, password: hashPassword, activationLink });
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

        const userDto = new UserDto(user); //email, id, isActivated
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(UserDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    };

    async activate(activationLink) {
        const user = await userModel.findOne({ activationLink });
        if (!user) {
            throw ApiError.BadRequest("Некорректная ссылка активации")
        };
        user.isActivated = true;
        await user.save();
    };

    async login(email, password) {
        const user = await userModel.findOne({ email });
        if (!user) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} не найден`)
        };
        const isPasswordEquals = await bcrypt.compare(password, user.password);
        if (!isPasswordEquals) {
            throw ApiError.BadRequest(`Неверный пароль`)
        };
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ userDto });
        await tokenService.saveToken(UserDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }
};

module.exports = new UserService();