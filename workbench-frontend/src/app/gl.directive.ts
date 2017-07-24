import { Directive, OnInit, Input, ApplicationRef, Injector, ElementRef, ViewContainerRef  } from '@angular/core';
declare var GoldenLayout:any;

@Directive({
  selector: '[gl]'
})
export class GlDirective {

  @Input() glConfig:any;

  layout:any;

  constructor(
    private elementRef: ElementRef,
    private Injector: Injector,
    private appRef: ApplicationRef,
    public viewRef: ViewContainerRef
  ) { }

  OnInit(){
    let disposeComp = (comp) => {
      if (comp.instance && comp.instance.ngOnDestroy){
        comp.instance.ngOnDestroy();
      }
      // this.appRef._unloadComponent(comp);
      this.appRef.detachView(comp)
    };

    let goldenConfig = this.glConfig || {
      settings: {
        hasHeaders: true
      },
      content: [{
        type: 'row',
        content: [{
          type: 'component',
          componentName: 'DataManager',
          componentState: {
            templateId: 'data_manager_wrapper'
          }
        }, {
          type: 'component',
          componentName: 'VisManager',
          componentState: {
            templateId: 'vis_manager_wrapper'
          }
        }, {
          type: 'component',
          componentName: 'RunManager',
          componentState: {
            templateId: 'run_manager_wrapper'
          }
        }, {
          type: 'component',
          componentName: 'NotificationManager',
          componentState: {
            templateId: 'notification_manager_wrapper'
          }
        }]
      }]
    };

    this.layout = new GoldenLayout(goldenConfig, this.elementRef.nativeElement);
    this.layout.registerComponent('DataManager', (container, state) => {
      var templateHtml = $('#' + state.templateId).html();
      var element = container.getElement();
      state.module = 'data_manager';
      element.html(templateHtml);
      angular
        .module(state.module)
        .value('container', container)
        .value('state', state);

      // Actually kick off Angular's magic
      angular.bootstrap(element[0], [state.module]);
    })
  }

}
