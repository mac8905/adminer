import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Users } from '../../models/users';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'login',
    templateUrl: './login.html',
    styleUrls: ['./login.scss']
})
export class Login implements OnInit {

    public form: FormGroup;
    public username: AbstractControl;
    public password: AbstractControl;
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
            'username': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
        });

        this.username = this.form.controls['username'];
        this.password = this.form.controls['password'];
    }

    public ngOnInit() {
    }

    public onSubmit(values: Object): void {
        this.submitted = true;
        if (this.form.valid) {
            this.user = values as Users;
            this.singIn();
        } else {
            this._notificationsService.error('Transacción fallida', 'Todos los campos del formulario son requeridos.');
        }
    }

    /**
     * Ingresar a la aplicacion
     * 
     * @private
     * 
     * @memberof Login
     */
    private singIn() {
        this.usersService.singIn(this.user)
            .subscribe(res => {
                if (res.success) {
                    this._notificationsService.success('Bienvenid@', res.data.user.full_names);
                    localStorage.setItem('authUser', JSON.stringify(res.data));
                    this.router.navigate(['/pages/dashboard']);
                } else {
                    this._notificationsService.error('Transacción fallida', res.message);
                }
            }, error => {
                this._notificationsService.error('Transacción fallida', error);
            });
    }
}
