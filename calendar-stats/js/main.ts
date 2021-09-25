/// <reference path="definitions/jquery/jquery.d.ts" />

/// <reference path="RippleButton.ts" />

////////////////////////////////
//
// this is only an exercice, the promises are just for practice
//
//

interface JQuery {
    swipe(swipe: any): any
}

namespace app {

    interface Year {
        name: number;
        months: [number];
    };

    interface Calendar {
        calendar: [Year];
    }

    import RippleButton = app.RippleButton;

    export class Main {
        
        private pathCalendar     : string;
        private data             : Calendar;
        private rippleButton     : RippleButton;

        private currentYear      : number;
        private currentStats     : [number];

        private classNameDisable : string;
        private classNameEneable : string;
        private classNameYear    : string;

        private delayActiveStats : number; //in milliseconds

        private $container       : JQuery;
        private $year            : JQuery;
        private $stats           : JQuery;
        private $btPrev          : JQuery;
        private $btNext          : JQuery;

        constructor() {

            this.pathCalendar     = '../jsons/calendar.json';
            this.classNameDisable = 'disable';
            this.classNameEneable = 'eneable';
            this.classNameYear    = 'year__name';

            this.delayActiveStats = 950;
            
            this.$container       = $( '#js-conainer' )
            this.$year            = $( '#js-year', this.$container );
            this.$stats           = $( '.js-stats', this.$container );

            this.$btPrev          = $( '#js-nav-prev' );
            this.$btNext          = $( '#js-nav-next' );

            this.rippleButton = new RippleButton();
        }

        init() {

            this
                .bindings()
                .loadCalendar()
                .then( this.getLastYear.bind( this ) )
                .then( this.setYears.bind( this ) )
                .then( this.getStats.bind( this ) )
                .then( this.setStats.bind( this ) );
        }

        private bindings(): this {

            this.rippleButton.init();

            $( document )
            .keydown( ( e: JQueryKeyEventObject ) => {

                switch( e.which ) {
                    // left
                    case 37: this.loadYear( this.currentYear - 1, e ); break;
                    case 40: this.loadYear( this.currentYear - 1, e ); break;

                    // right
                    case 39: this.loadYear( this.currentYear + 1, e ); break;
                    case 38: this.loadYear( this.currentYear + 1, e ); break;
                    case 32: this.loadYear( this.currentYear + 1, e ); break;
                };
            });

            this.$container
            .swipe( {
                swipe: ( e: any, direction: any, dist: any, dur: any, count: any, data: any ) => {

                  if( direction == 'left'  ) this.loadYear( this.currentYear + 1 );
                  if( direction == 'right' ) this.loadYear( this.currentYear - 1 );
                },
            });

            this.$btPrev.on('click touched', () => { this.loadYear( this.currentYear - 1 ) } );
            this.$btNext.on('click touched', () => { this.loadYear( this.currentYear + 1 ) } );

            return this;
        }

        // private loadCalendar(): JQueryPromise<{}> {

        //     return $.getJSON( this.pathCalendar );
        // }

        private loadCalendar(): JQueryPromise<{}> {

            const defer = $.Deferred();

            defer.resolve( {
                "calendar": [
                    {"name": 2015, "months": [ 54, 25, 55, 30, 50, 24, 52, 12, 54, 70, 80, 34 ] },
                    {"name": 2016, "months": [ 35, 60, 34, 22, 64, 65, 40, 80, 90, 44, 10, 92 ] },
                    {"name": 2017, "months": [ 80, 95, 44, 54, 17, 32, 74, 45, 75, 90, 72, 74 ] },
                    {"name": 2018, "months": [ 10, 25, 44, 54, 17, 32, 74, 45, 75, 90, 72, 74 ] },
                    {"name": 2019, "months": [ 54, 25, 55, 30, 50, 24, 52, 12, 54, 70, 80, 34 ] },
                    {"name": 2020, "months": [ 35, 60, 34, 22, 64, 65, 40, 80, 90, 44, 64, 62 ] },
                    {"name": 2021, "months": [ 50, 70, 44, 54, 95, 12, 74, 45, 75, 90, 72, 74 ] }
                ]
            });

            return defer.promise();
        }

        private getLastYear( data: Calendar ): JQueryPromise<{}> {

            const defer = $.Deferred();

            this.data = data;
            this.currentYear = this.data.calendar[ this.data.calendar.length - 1 ].name;

            defer.resolve();

            return defer.promise();
        }

        private setYears(): JQueryPromise<{}> {
            const defer = $.Deferred();

            this.$year.html('');
            for ( let i = this.data.calendar.length - 1; i >= 0; i-- ) {
                
                const digits = ( '' +  this.data.calendar[i].name ).split( '' );

                let year = '';

                for ( let ii = 0; ii < digits.length; ii++ ) {

                    year += '<span>' + digits[ ii ] + '</span>';
                }

                this.$year.append('<div class="' + this.classNameYear + '">' + year + '</div>');
            }

            defer.resolve();

            return defer.promise();
        }

        private getStats( yearName: number = this.currentYear ): JQueryPromise<Year> {

            const defer = $.Deferred();

            for ( let i = this.data.calendar.length - 1; i >= 0; i-- ) {

                if( this.data.calendar[ i ].name == yearName ) {
                    
                    defer.resolve( this.data.calendar[ i ] );
                    
                    return defer.promise();
                }
            }

            defer.resolve( null );

            return defer.promise();
        }

        private setStats( year: Year ): JQueryPromise<Year> {

            const defer = $.Deferred();
            
            if( year ){
                this.currentYear = year.name;
                this.currentStats = year.months;

                if( this.isFirstYear() ){
                    this.$btNext.css({'display': 'none'});
                }else{
                    this.$btNext.css({'display': 'block'});
                }

                if( this.isLAstYear() ){
                    this.$btPrev.css({'display': 'none'});
                }else{
                    this.$btPrev.css({'display': 'block'});
                }

                this.displayData();
            }

            defer.resolve( null );

            return defer.promise();
        }

        private displayData() {

            this.$container .addClass( this.classNameDisable );

            setTimeout( () => {

                this.$container.removeClass( this.classNameDisable );
            }, this.delayActiveStats );

            const $yearsName = $('.' + this.classNameYear);
            $yearsName.removeClass(this.classNameEneable);

            for ( let i = $yearsName.length-1; i >= 0; i-- ) {
                if( $yearsName.eq(i).text() == this.currentYear + '' ) {
                    
                    $yearsName.eq(i).addClass( this.classNameEneable );
                    break;
                }
            }
            this.$stats.removeClass( 'highlight__high' );
            this.$stats.removeClass( 'highlight__low' );

            const max = Math.max.apply( Math,this.currentStats );
            const min = Math.min.apply( Math,this.currentStats );

            for ( let i = this.currentStats.length - 1; i >= 0; i-- ) {
                
                const $el = this.$stats.eq(i);

                $el
                .find('.bar')
                .css( { 'height': (100 - this.currentStats[i]) + '%' } );

                if     ( max == this.currentStats[i] ){ $el.addClass( 'highlight__high'); }
                else if( min == this.currentStats[i] ){ $el.addClass( 'highlight__low' ); }
            }
        }

        private isLAstYear(): boolean {
            return this.data.calendar[ 0 ].name == this.currentYear;
        }

        private isFirstYear(): boolean {
            return this.data.calendar[ this.data.calendar.length - 1 ].name == this.currentYear;
        }

        private loadYear( yearName: number, e?: JQueryKeyEventObject ) {

            if( e ) e.preventDefault(); // prevent the default action (scroll / move caret)

            this
                .getStats(yearName)
                .then( this.setStats.bind( this ) );
        }
    }
}

let main: any;


$('document')
.ready( () => {
    main = new app.Main();
    main.init();
});


