import { ROLE_WEIGHTS, type UserRole } from "../model/types";

export const getHighestRole = (roles: UserRole[]): UserRole => {
	if (!roles.length) return { type: "Default", weight: ROLE_WEIGHTS.Default }
	return roles.reduce((highest, current) => current.weight > highest.weight ? current : highest)
}