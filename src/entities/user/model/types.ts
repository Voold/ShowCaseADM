import type { ComponentPropsWithRef } from "react";

export interface UserSlotProps extends ComponentPropsWithRef<'div'> {
	id: string,
	fullName: string,
	avatar?: string,
	email?: string,
	userRole?: UserRoleTypes
}

export type UserRoleTypes = {
	title: string,
	isActive: boolean
}