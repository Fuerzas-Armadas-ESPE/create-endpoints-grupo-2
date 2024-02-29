import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { CommentsController } from "./comment.controller";
import { Comment } from "./comment.model";
import { CommentsModule } from "./comment.module";
import { CommentsService } from "./comment.service";

describe('CommentsController', () => {
    let controller: CommentsController;
    let service: CommentsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [CommentsModule],
        })
            .overrideProvider(getModelToken('Comment'))
            .useValue(jest.fn())
            .compile();

        controller = module.get<CommentsController>(CommentsController);
        service = module.get<CommentsService>(CommentsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
      });
});