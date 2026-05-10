// TODO - Обновить тип юзера
export type User = {
  userId: string;
  meta: {
    firstName: string;
    lastName: string;
    bio: string;
    skills: string;
    expirience: string;
  };
  profilePicture: null | string;
  roles: {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    Default?: {};
    Student?: {
      course: string;
      school: string;
      meta: {
        group: string;
      };
    };
  };
  email: string;
  capabilites: string[];
};

export type UserDto = {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
};
