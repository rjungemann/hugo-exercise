import { Body, Controller, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common'
import { ApplicationService } from '../models/application/application.service'
import { Application } from '../models/application/application.entity'
import { ApplicationCreateDto } from 'src/types/ApplicationCreateDto'
import { ApplicationPutDto } from 'src/types/ApplicationPutDto'
import { ApplicationSubmitDto } from 'src/types/ApplicationSubmitDto'

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Get()
  findAll(): Promise<Application[]> {
    return this.applicationService.findAll()
  }

  @Post()
  async create(@Body() body: ApplicationCreateDto): Promise<string> {
    const frontendUrl = process.env.FRONTEND_URL
    if (!frontendUrl) {
      throw new Error('FRONTEND_URL must be provided')
    }
    const data = await this.applicationService.create(body)
    const payload = encodeURI(JSON.stringify(data))
    const url = `${frontendUrl}/application/page/1?application=${payload}`
    return url
  }

  @Get(':id')
  async find(@Param('id') id: string): Promise<Application | null> {
    const parsedId = parseInt(id, 10)
    return this.applicationService.find(parsedId)
  }

  @Put(':id')
  async put(@Param('id') id: string, @Body() body: ApplicationPutDto): Promise<Application> {
    const parsedId = parseInt(id, 10)
    return this.applicationService.put({ id: parsedId, ...body })
  }

  @Post(':id/submit')
  async submit(@Param('id') id: string): Promise<Application> {
    const parsedId = parseInt(id, 10)
    return this.applicationService.submit({ id: parsedId })
  }
}
