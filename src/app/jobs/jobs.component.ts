import { trigger, style, transition, animate, useAnimation } from '@angular/animations';
import { Component } from '@angular/core';
import { Job } from '../models/job';
import { JobService } from '../job.service';
import { bounceOutLeftAnimation, fadeInAnimation } from '../animations';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
  animations: [
    trigger('jobAnimation', [
      transition(':enter', [
        useAnimation(fadeInAnimation, {
          params: {
            duration: '1s'
          }
        })
      ]),
      transition(':leave', [
        style( { backgroundColor: '#ff4c4c', borderColor: 'red', color: 'red' }),
        animate(1000),
        useAnimation(bounceOutLeftAnimation)
      ])
    ])
  ]
})
export class JobsComponent {
  jobs: Job[];
  completeJobStyling = { 'backgroundColor': '#beed90', 'color': 'green' };
  loading = true;

  constructor(private jobService: JobService) {
    this.jobService.getJobs()
      .subscribe(
        (response) => {
          this.jobs = response.sort((a, b) => moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf());
          this.loading = false;
        });
  }

  addJob(input: HTMLInputElement) {
    const job = new Job(input.value);
    this.jobService.createJob(job)
      .subscribe();
    this.jobs.splice(0, 0, job);
    input.value = '';
  }

  removeJob(job: Job) {
    this.jobService.deleteJob(job.name)
      .subscribe();
    const index = this.jobs.indexOf(job);
    this.jobs.splice(index, 1);
  }

  completeJob(job: Job) {
    const updated: Job = new Job(job.name, true);
    this.jobService.updateJob(updated)
      .subscribe();
    const index = this.jobs.indexOf(job);
    const selector = '#job-' + index;
    $(selector).hide();
    $(selector + ' > div > button').prop('disabled', true);
    $(selector).css(this.completeJobStyling).fadeIn(1500);
  }
}
