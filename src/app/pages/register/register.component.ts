import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Users } from '../../models/users';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'register',
    templateUrl: './register.html',
    styleUrls: ['./register.scss']
})
export class Register {

    public form: FormGroup;
    public username: AbstractControl;
    public submitted: boolean = false;
    private user: Users = new Users();
    public udImg: string;
    public lbImg: string;

    constructor(
        fb: FormBuilder,
        private usersService: UsersService,
        private router: Router,
        private _notificationsService: NotificationsService
    ) {
        this.udImg = '../../../assets/img/ud_trans.png';
        this.lbImg = '../../../assets/img/laboratory.png';

        this.form = fb.group({
            'username': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
        });

        this.username = this.form.controls['username'];
    }

    public onSubmit(values: Object): void {
        this.submitted = true;
        if (this.form.valid) {
            // your code goes here
            this.user = values as Users;
            this.forgot();
        }
    }

    /**
     * Recuperar password
     * 
     * @private
     * 
     * @memberof Register
     */
    private forgot() {
        this.usersService.forgot(this.user.username)
            .subscribe(res => {
                if (res.success) {
                    this._notificationsService.success('Restablecer Contraseña', res.message);
                    this.router.navigate(['/login']);
                } else {
                    this._notificationsService.error('Transacción fallida', res.message);
                }
            }, error => {
                this._notificationsService.error('Transacción fallida', error);
            });
    }
}
