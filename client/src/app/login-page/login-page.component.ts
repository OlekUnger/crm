import {Component, OnInit, OnDestroy} from '@angular/core'
import {FormControl, FormGroup, Validators} from "@angular/forms"
import {AuthService} from "../shared/services/auth.service"
import {Subscription} from "rxjs"
import {ActivatedRoute, Params, Router} from "@angular/router"
import {MaterialService} from "../shared/classes/material.service";

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

    form: FormGroup
    aSub: Subscription // чтобы не было утечки памяти при subscribe

    constructor(private auth: AuthService,
                private router: Router,
                private route: ActivatedRoute// здесь содержится вся информация о текущем роуте
    ) {
    }

    ngOnInit() {
        this.form = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required, Validators.minLength(6)])
        })

        // подпишемся на объект queryParams текущего роута
        this.route.queryParams.subscribe((params: Params) => {
            if (params['registered']) {
                // теперь вы можете зайти в сиситему используя свои данные
                MaterialService.toast('Можете зайти в сиситему используя свои данные')
            } else if (params['accessDenied']) {
                // для начала авторизуйтесь
                MaterialService.toast('Вы не авторизованы')
            } else if(params['sessionFailed']) {
                MaterialService.toast('Перезайдите в систему')
            }
        })
    }

    //будет вызываться при переходе на другую страницу
    ngOnDestroy() {
        //отписывемся от subscribe, чтобы не было утечек памяти
        if (this.aSub) this.aSub.unsubscribe()
    }

    onSubmit() {
        this.form.disable()// чтобы не отправлять несколько запросов

        this.aSub = this.auth.login(this.form.value).subscribe(
            ()=>this.router.navigate(['/overview']),
            error => {
                MaterialService.toast(error.error.message)
                this.form.enable()
            }
        )
    }

}
