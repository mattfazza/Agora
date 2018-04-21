import { Component, OnInit, OnDestroy, Input, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Gene } from '../../models';

import { BreadcrumbService, DataService } from '../../core/services';
import { GeneService } from '../../core/services';

import * as d3 from 'd3';

@Component({
    selector: 'targets-view',
    templateUrl: './targets-view.component.html',
    styleUrls: [ './targets-view.component.scss' ],
    encapsulation: ViewEncapsulation.None
})
export class TargetsViewComponent implements OnInit {
    dataLoaded: boolean = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private breadcrumb: BreadcrumbService,
        private geneService: GeneService,
        private dataService: DataService
    ) { }

    ngOnInit() {
        this.breadcrumb.setCrumbs([
            { label: 'TARGETS', routerLink: ['/targets'] }
        ])

        this.dataService.loadGenesFile('sampleData.csv').then((status) => {
            if (status) {
                this.dataLoaded = true;
            }
            // Handle error later
        });
    }

    viewGene() {
        this.router.navigate(['gene-details', this.geneService.getCurrentGene().ensembl_gene_id], {relativeTo: this.route});
    }
}