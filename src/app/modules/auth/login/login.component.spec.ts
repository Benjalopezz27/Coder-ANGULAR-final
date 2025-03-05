import { TestBed } from "@angular/core/testing"
import { LoginComponent } from './login.component';
import { SharedModule } from "../../../shared/shared.module"
import { Validators } from "@angular/forms";
import { MockProvider } from "ng-mocks";
import { AuthService } from "../../../core/services/auth.service";

describe('LoginComponent', () => {

    let loginComponent: LoginComponent
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports:[SharedModule],
            providers:[MockProvider(AuthService)]
        }).compileComponents()
        loginComponent = TestBed.createComponent(LoginComponent).componentInstance
    })
    it('Debe instanciar el login component', ()=> {
        const fixture = TestBed.createComponent(LoginComponent)
        expect(fixture.componentInstance).toBeTruthy()
    })
    it('Email y password deben ser requeridos en loginForm', ()=>{
        
        expect(loginComponent.loginForm.get('email')?.hasValidator(Validators.required)).toBe(true)
        
        expect(loginComponent.loginForm.get('password')?.hasValidator(Validators.required)).toBe(true)
    })
    it('SI el form es invalido, debe marcar todos los campos como tocados', ()=>{
        loginComponent.loginForm.setValue({
            email: '',
            password: ''
        })
        const spyOnMarkAllAsTouched = spyOn(loginComponent.loginForm, 'markAllAsTouched')
        loginComponent.onSubmit()
        expect(spyOnMarkAllAsTouched).toHaveBeenCalledTimes(1)
    })
    it('Si el form es valido debe llamar al logIn del authService', ()=>{
        loginComponent.loginForm.setValue({
            email:'test@gmai.com',
            password: '123456'
        })
        const spyOnLogin = spyOn((loginComponent as any).authService, 'login')
        loginComponent.onSubmit()

        expect(spyOnLogin).toHaveBeenCalledTimes(1)
    })
})