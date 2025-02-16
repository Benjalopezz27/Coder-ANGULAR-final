import { TestBed } from "@angular/core/testing"
import { AuthService } from "./auth.service"
import { Router } from "@angular/router"
import { MockProvider} from 'ng-mocks'
describe('authService', ()=>{
    let authService: AuthService
    let router: Router
    beforeEach(()=>{
        TestBed.configureTestingModule({
            providers: [AuthService,
                MockProvider(Router)
            ]
        }).compileComponents()
        authService = TestBed.inject(AuthService)
        router = TestBed.inject(Router)
    })
    it('authService debe ser creado', ()=>{
        expect(authService).toBeTruthy()
    })
    it('Un login satisfactorio, debe establecer el user autenticado, debe establecer el accessToken en el localStorage, debe redirigir al home', ()=> {
        const spyOnNavigate = spyOn(router, 'navigate')
        authService.login({
            email:'admin@gmail.com',
            password:'123456'
        })
        authService.authUser$.subscribe({
            next(authUser){
                expect(authUser).toBeTruthy()
                expect(localStorage.getItem('token')).toBeTruthy()
                expect(spyOnNavigate).toHaveBeenCalledWith(['dashboard', 'home'])
            }
        })
        
    })

})