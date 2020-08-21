const mongoose = require('mongoose');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

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



// pre(): userSchema가 실행되기 전에 실행되는 함수
// pre(): async, await를 반드시 써야한다
userSchema.pre('save', async function (next) {
    try {

        console.log("entered")

        // avatar 생성
        const avatar = await gravatar.url(this.email, {
            s: '200', // size
            r: 'pg',  // Rating
            d: 'mm'   // Default
        })
        this.avatar = avatar;
        
        // 패스워드 암호화
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(this.password, salt);
        this.password = passwordHash;

        console.log("exited")
        next();

    } catch (error) {
        next(error)
    }
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    })
}




module.exports = mongoose.model('user', userSchema);