import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { BehaviorSubject, distinctUntilChanged, filter, interval, map, Observable, of, Subject, take, tap } from 'rxjs';

//Jest -> 
describe('App', () => {

  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     imports: [App],
  //   }).compileComponents();
  // });

  // it('should create the app', () => {
  //   const fixture = TestBed.createComponent(App);
  //   const app = fixture.componentInstance;
  //   expect(app).toBeTruthy();
  // });

  // it('should render title', async () => {
  //   const fixture = TestBed.createComponent(App);
  //   await fixture.whenStable();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('h1')?.textContent).toContain('Hello, videoclub-ng-bs-app');
  // });

    it('promises vs observables', async () => {
    
      //Railtruck pattern:
      //then way (happy path)
      //   |
      //   v
      //===X=====X=============X===== resolve
      //   |     ^             |          
      //   V     |             V          
      //   t --> P<number> --> t --> P<void>
      //
      //
      //============================= reject
      //               ^
      //catch way ------ (unhappy path)

      parseNumberWithDelay('50')      
      .then( r => {
        return r*2;
        //Equivaltente a una promesa resuelta instantánea r*2, 
        //pero sin necesidad de escribir
        //return Promise.resolve(r*2);
      })      
      .catch(console.error)
      //.catch(e => console.error(e))
      .then(console.log);
      //.then(r => console.log(r));


      //Por await
      try {
        const result = await parseNumberWithDelay('50');
        console.log(result);
      } catch (e) {
        console.error(e);        
      }

      const result = await parseNumberWithDelay('50');
      console.log(result);


      //Railtruck pattern:
      //then way
      //   
      //
      //====================== resolve
      //      
      //     
      //     c --> P<void>
      //     ^
      //     |
      //=====X================ reject
      //     ^
      //     |               
      //catch way 
      parseNumberWithDelay('asdf')      
      .then( r => {
        return r*2;
        //Equivaltente a una promesa resuelta instantánea r*2, 
        //pero sin necesidad de escribir
        //return Promise.resolve(r*2);
      })      
      .catch(console.error)
      //.catch(e => console.error(e))
      .then(console.log);
      //.then(r => console.log(r));



    //Observables de la librería RxJS

    //Tipo Observable
    //unicast: n suscriptores → n ejecuciones.
    //cold: empieza a emitir cuando te suscribes.
    const obs$ = new Observable<number>((sub) => {
              console.log("Se ejecuta el producer");
              sub.next(Math.random());
              sub.complete();
            });

    obs$.subscribe((v) => console.log("A:", v));
    obs$.subscribe((v) => console.log("B:", v));
    // Verás "Se ejecuta el producer" dos veces y valores distintos


    //Tipo Subject
    //multicast: n suscriptores → 1 ejecución.
    //hot: empieza a emitir desde el principio, no importa cuándo te suscribas.
    //No guarda valores: si te suscribes tarde, no recibes lo anterior.
    const s$ = new Subject<number>();

    s$.subscribe((v) => console.log("A:", v));
    s$.next(1); // A recibe 1

    s$.subscribe((v) => console.log("B:", v));
    s$.next(2); // A recibe 2, B recibe 2


    //Tipo BehaviorSubject
    //multicast: n suscriptores → 1 ejecución.
    //hot: empieza a emitir desde el principio, no importa cuándo te suscribas.
    //Guarda el último valor emitido: si te suscribes tarde, recibes ese valor.
    const bs$ = new BehaviorSubject<number>(0); // valor inicial

    bs$.subscribe((v) => console.log("A:", v)); // A recibe 0 al instante

    bs$.next(1); // A recibe 1

    bs$.subscribe((v) => console.log("B:", v)); // B recibe 1 al instante (último valor)

    bs$.next(2); // A recibe 2, B recibe 2

    of(1, 2, 3, 4)
    .pipe(
      filter( n => n % 2 === 0),
      map( n => n * 10)
    )
    .subscribe(console.log); // 20, 40


    of("1", "2")
    .pipe(
      map((s) => Number(s))
    )
    .subscribe(console.log); // 1, 2

    of(1, 2, 3)
    .pipe(
      tap((v) => console.log("antes:", v))
    ).subscribe();

    interval(200)
    .pipe(take(3))
    .subscribe(console.log); // 0,1,2

    of(1,1,2,2,2,3)
    .pipe(
      distinctUntilChanged()
    ).subscribe(console.log); // 1,2,3

    });


  

});


function parseNumberWithDelay(n: string, delay: number = 1000): Promise<number> {

  return new Promise((resolve, reject) => {
    
    setTimeout(() => {
      //const parsed = parseInt(n, 10);
      const parsed = Number(n);
      if (isNaN(parsed)) {
        reject(new Error(`Cannot parse '${n}' as a number`));
      } else {
        resolve(parsed);
      }
    }, delay);

  });

/*
Sí. Aquí tienes un **listado práctico** (no exhaustivo) de los **principales operadores que se usan dentro de `pipe()` en RxJS**, agrupados por uso.

Transformación

map

scan

mergeScan

switchScan

buffer, bufferCount, bufferTime, bufferToggle, bufferWhen

window, windowCount, windowTime, windowToggle, windowWhen

materialize

dematerialize

Filtrado

filter

take, takeLast, takeWhile, takeUntil

first, last, single

skip, skipLast, skipWhile, skipUntil

distinct, distinctUntilChanged, distinctUntilKeyChanged

elementAt

ignoreElements

Tiempo y control de ritmo

debounceTime, debounce

throttleTime, throttle

auditTime, audit

sampleTime, sample

delay, delayWhen

timeInterval

timestamp

timeout, timeoutWith

Combinación

combineLatestWith

withLatestFrom

zipWith

concatWith

mergeWith

raceWith

startWith, endWith

pairwise

(funciones de combinación muy usadas, aunque no sean operadores dentro de pipe): combineLatest, forkJoin, merge, concat, zip, race

Flattening / mapeo a async

switchMap

mergeMap

concatMap

exhaustMap

switchAll, mergeAll, concatAll, exhaustAll

expand

Errores y reintentos

catchError

retry, retryWhen

onErrorResumeNext

throwIfEmpty

Utilidad / side effects

tap

finalize

repeat, repeatWhen

share, shareReplay

observeOn, subscribeOn

Condiciones / booleanos

every

defaultIfEmpty

Conversión / acumulación

reduce

toArray

count

*/
}
