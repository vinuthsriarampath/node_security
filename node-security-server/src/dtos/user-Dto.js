export class UserDto {
    constructor(user) {
        this.id = user._id;
        this.email = user.email;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.dob = user.dob;
        this.address = user.address;
        this.phone = user.phone;
    }
}