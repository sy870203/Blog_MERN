const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true
        },
        // 프로필 이미지
        avatar: {
            type: String
        },
        role: {
            type: String,
            default: 'subscriber'
        },
        resetPasswordLink: {
            data: String,
            default: ''
        }
    },
    {
        // 스키마가 생성되면 생성날짜, 업데이트 날짜 자동으로 생성해준다.
        timestamps: true
    }
);








module.exports = mongoose.model('user', userSchema);